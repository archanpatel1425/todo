import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: String) => {
    return jwt.sign({ id: userId }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '1h' });
};

export const generateRefreshToken = (userId: String) => {
    return jwt.sign({ id: userId }, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
    const istokenValid = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string)
    return istokenValid
};

export const verifyRefreshToken = (token: string) => {
    const istokenValid = jwt.verify(token, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET as string);
    return istokenValid
};

export const getAccessTokenPayload = (token: string) => {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as jwt.JwtPayload;
    return decoded.id
}

export const getRefreshTokenPayload = (token: string) => {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET as string) as jwt.JwtPayload;
    return decoded.id
}