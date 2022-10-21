import {sendResponseText} from "../helper/util";
import {Env} from "../index";


export async function apiKvSet(req: Request, env: Env) {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    const apikey = req.headers.get('apikey');
    const value = req.body;

    if (apikey !== env.KV_API_KEY) {
        return sendResponseText('Unauthorized. Wrong apikey.');
    }

    await env.AOE2COMPANION.put(key!, value!, {
        expirationTtl: 60 * 60 * 24 * 365,
    });

    return sendResponseText('OK');
}
