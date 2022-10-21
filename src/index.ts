// import {apiMatches} from "./api/matches";
import {setPrisma} from "./db";
import {apiLeaderboards} from "./api/leaderboards";
import {apiProfiles} from "./api/profiles";
import {apiMaps} from "./api/maps";
import {apiLeaderboardSingle} from "./api/leaderboards.[id]";
import {apiProfileSingle} from "./api/profiles.[id]";
import {
    apiReady,
    apiError,
    apiMatches,
    apiMatch,
    apiLeaderboard,
    apiPlayerRatinghistory,
    apiProfile,
    apiPlayerMatches,
    apiNightbotRank,
    apiNightbotMatch
} from "./api/legacy";

export interface Env {
    // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
    // MY_KV_NAMESPACE: KVNamespace;
    //
    // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
    //
    // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
    // MY_BUCKET: R2Bucket;

    DATABASE_URL: string;
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const { url } = request

        if (url.includes('/favicon.ico')) return new Response('');

        const { searchParams, pathname } = new URL(url);


        setPrisma(env);

        // console.log('url', url);
        // console.log(env.DATABASE_URL);

        // if (url.includes('/api/matches?')) return await apiMatches(request, env);




        if (pathname.startsWith('/ready')) return await apiReady(request, env);
        if (pathname.startsWith('/error')) return await apiError(request, env);
        if (pathname.startsWith('/api/matches')) return await apiMatches(request, env);
        if (pathname.startsWith('/api/match')) return await apiMatch(request, env);
        if (pathname.startsWith('/api/leaderboard')) return await apiLeaderboard(request, env);
        if (pathname.startsWith('/api/player/ratinghistory')) return await apiPlayerRatinghistory(request, env);
        if (pathname.startsWith('/api/profile')) return await apiProfile(request, env);
        if (pathname.startsWith('/api/player/matches')) return await apiPlayerMatches(request, env);
        if (pathname.startsWith('/api/nightbot/rank')) return await apiNightbotRank(request, env);
        if (pathname.startsWith('/api/nightbot/match')) return await apiNightbotMatch(request, env);

        // if (pathname.startsWith('/api/matches')) return await apiMatches(request, env);
        // if (pathname.startsWith('/api/leaderboards/')) return await apiLeaderboardSingle(request, env);
        // if (pathname.startsWith('/api/leaderboards')) return await apiLeaderboards(request, env);
        // if (pathname.startsWith('/api/maps')) return await apiMaps(request, env);
        // if (pathname.startsWith('/api/profiles/')) return await apiProfileSingle(request, env);
        // if (pathname.startsWith('/api/profiles')) return await apiProfiles(request, env);

        return new Response("Hello World!");
    },
};
