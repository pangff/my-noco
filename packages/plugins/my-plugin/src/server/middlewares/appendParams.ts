/*
 * @Author: pangff
 * @Date: 2022-08-17 21:46:55
 * @LastEditTime: 2022-08-18 15:28:43
 * @LastEditors: pangff
 * @Description: 
 * @FilePath: /my-noco-app/packages/plugins/my-plugin/src/server/middlewares/appendParams.ts
 * stay hungry,stay foolish
 */
import { Context, Next } from '@nocobase/actions';
import { MiddlewareManager } from '@nocobase/resourcer';

export function appendParams() {
  const middleware = new MiddlewareManager();
  middleware.use(async function (ctx: Context, next: Next) {
    if (ctx.request.path == '/api/news:list') { //替换url
        ctx.URL.searchParams.append('appends[]','readers')
        ctx.url = ctx.URL.toString();
    }
    let result = await next();
    if (ctx.request.path == '/api/news:list') { //拦截请求结果
        let newsList = ctx.response.body['data'];
        if (newsList) {
            newsList.map((news)=>{
                let users = news['readers'];
                if (users && users.length > 0) {
                    for (let i=0;i<users.length;i++) {
                        let user = users[i]
                        if (user.get('id') == ctx.state.currentUser.id) {
                            news.dataValues['followed'] = true
                            break;
                        }
                    }
                }
                return news;
            })
        }
    }
   
    return result;
  });
  return middleware;
}