export const getProfilePic = (url: string): string => {
  return url === "default" ? "/default.jpg" : url;
};
