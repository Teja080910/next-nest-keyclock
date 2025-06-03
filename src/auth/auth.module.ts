import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authServerUrl = configService.get<string>('KEYCLOAK_URL');
        const realm = configService.get<string>('KEYCLOAK_REALM');
        const clientId = configService.get<string>('KEYCLOAK_CLIENT_ID');
        const secret = configService.get<string>('KEYCLOAK_SECRET');
        if (!authServerUrl || !realm || !clientId || !secret) {
          throw new Error('Missing Keycloak configuration environment variables');
        }
        return { authServerUrl, realm, clientId, secret };
      },
    }),
  ],
  exports: [KeycloakConnectModule],
})
export class AuthModule { }