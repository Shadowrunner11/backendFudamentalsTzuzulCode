import client from '../data/prisma';
import { User as UserType, Profile as ProfileType } from '../../prisma/generated/prisma-client-js';
import { compare, genSalt, hash } from 'bcryptjs';


type RegisterInfo = Omit<UserType
  & ProfileType, 'id' | 'salt' | 'createdAt' | 'lastTime'>

type BasicConfigUser = Pick<UserType, 'email' | 'password'>


class User {
  async login(config: BasicConfigUser) {
    try {
      const { email, password } = config;

      const { id, username, password: hashed } = await client.user.update({
        where: { email },
        data: { lastTimme: new Date() }
      });

      const isValid = await compare(password, hashed);

      return {
        response: {
          succes: isValid,
          message: isValid ? 'Bienvenido' : 'Credenciales incorrectas',
          username: isValid ? username : null
        },
        id
      };

    } catch (e) {
      return { response: { succes: false, message: 'Fallo la autentificacion' } };
    } finally {
      await client.$disconnect();
    }
  }

  async register(config: RegisterInfo) {
    const { email, username, password } = config;
    const { gender, lastname, birthdate, name } = config;

    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const { username: usernameResponse, id } = await client.user.create({
        data: {
          email,
          username,
          salt,
          password: hashedPassword,
          profile: {
            create: {
              gender,
              lastname,
              birthdate,
              name
            }
          }
        }
      });

      return {
        response: {
          succes: true,
          usernme: usernameResponse,
          message: 'Creado con exito'
        },
        id
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: user.controller.ts ~ line 35 ~ User ~ register ~ e', e);
      return { succes: false };
    } finally {
      await client.$disconnect();
    }
  }
}
export default new User();