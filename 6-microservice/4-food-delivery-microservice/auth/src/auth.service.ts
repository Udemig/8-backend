import type { LoginInput, RegisterInput } from "./auth.dto.js";
import type { IUser } from "./types/index.js";
import User from "./auth.model.js";
import { AppError } from "./utils/app-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rabbitmqService from "./rabbitmq.service.js";

//* Auth Service - Business Logic
class AuthService {
  private generateToken(user: IUser): string {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }

  async register(body: RegisterInput) {
    // email kontrolü
    const existingUser = await User.findOne({ email: body.email });

    // email kullanılıyorsa hata fırlat
    if (existingUser) throw new AppError("Bu email adresi zaten kullanılıyor", 409);

    // şifre hasheleme
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // kullanıcıyı oluştur
    const user = await User.create({ ...body, password: hashedPassword });

    // eğer kurye hesabı oluşturulduysa delivery servisine mesaj gönder
    if (user.role === "courier") {
      await rabbitmqService.publishMessage("courier.created", user);
    }

    // token oluştur
    const token = this.generateToken(user);

    // client'a gönderilecek cevabı oluştur
    return { user, token };
  }

  async login(body: LoginInput) {
    // email kontrolü
    const user = await User.findOne({ email: body.email });
    if (!user) throw new AppError("Geçersiz email adresi veya şifre", 401);

    // şifre kontrolü
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) throw new AppError("Geçersiz email adresi veya şifre", 401);

    // token oluştur
    const token = this.generateToken(user);

    return { user, token };
  }
}

export default new AuthService();
