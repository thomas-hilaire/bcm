export function requestLogging(ctx, next): Promise<void> {
    console.log(`[Request] ${ctx.method} ${ctx.url}`);
    return next();
}
