import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthResponse, LoginData, RegisterData } from "../types";
import api from "./axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const authService = {
  register: (body: RegisterData) =>
    api.post<AuthResponse>("/auth/register", body, { headers: { "Content-Type": "multipart/form-data" } }),
  login: (body: LoginData) => api.post<AuthResponse>("/auth/login", body),
  profile: () => api.get<AuthResponse>("/auth/profile"),
  logout: () => api.post("/auth/logout"),
};

// register için kullanılacak mutasyon
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      navigate("/login");
      toast.success("Hesabınız oluşturuldu. Giriş yapabilirsiniz.");
    },
    onError: () => {
      toast.error("Kayıt olma işleminde bir hata oluştu");
    },
  });
};

// login için kullanılacak mutasyon
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      navigate("/");
      toast.success("Oturumunuz açıldı");
      // profil sorgusunu gerçekleştir
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Giriş yapma işleminde bir hata oluştu");
    },
  });
};

// logout için kullanılacak mutasyon
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // profile verisinin cache'ini temizle
      const resetCache = () => {
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ["profile"] })
          .forEach((query) => query.setData(undefined));
      };
      resetCache();

      navigate("/login");
      toast.success("Oturumunuz kapatıldı");
    },
    onError: () => {
      toast.error("Çıkış yapma işleminde bir hata oluştu");
    },
  });
};

// profile verilerini almak için query
export const useProfile = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: authService.profile,
    staleTime: 0,
    retry: false,
    select: (res) => res.data.user,
  });

  return { isLoading, error, user: data };
};
