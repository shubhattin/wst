import { t } from './trpc_init';
import { complaints_router } from './routers/complaints';

export const appRouter = t.router({
  complaints: complaints_router
});

export type AppRouter = typeof appRouter;
