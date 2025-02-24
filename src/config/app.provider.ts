import { Provider } from "@nestjs/common"
import appConfig from "./app.config"

export const AppProvider: Provider = {
    provide: 'ENV',
    useFactory: () => {
        const env = appConfig();
        return {
          SECRET_KEY: env.SECRET_KEY,
          EXPIRED_ACCESS_TOKEN: env.EXPIRED_ACCESS_TOKEN,
          EXPIRED_REFRESH_TOKEN: env.EXPIRED_REFRESH_TOKEN,
          TIME_LIMIT_REQUEST: env.TIME_LIMIT_REQUEST || null,
          LIMIT_REQUEST: env.LIMIT_REQUEST || null,
          ALGORITHM: env.ALGORITHM,
        };
    },
}