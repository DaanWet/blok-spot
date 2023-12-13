import type { InjectionKey } from 'vue';
import type UserAuth from '@/dataTypes/UserAuth';

export const UserAuthKey: InjectionKey<UserAuth> = Symbol('UserAuth');
export const AuthUpdateKey: InjectionKey<Function> = Symbol('AuthUpdate');