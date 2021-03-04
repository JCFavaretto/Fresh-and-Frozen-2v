import jwt from "jwt-simple";
import moment from "moment";

export function createAccessToken(user) {
  let payload = {
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };
  if (user.calle) {
    payload = {
      ...payload,
      calle: user.calle,
      altura: user.altura,
      depto: user.depto,
      piso: user.piso,
      telefono: user.telefono,
    };
  }

  return jwt.encode(payload, process.env.SEED);
}

export function createRefreshToken(user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, process.env.SEED);
}

export function decodedToken(token) {
  return jwt.decode(token, process.env.SEED, true);
}
