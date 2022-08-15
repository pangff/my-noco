/*
 * @Author: pangff
 * @Date: 2022-08-15 17:00:43
 * @LastEditTime: 2022-08-15 18:02:55
 * @LastEditors: pangff
 * @Description: 
 * @FilePath: /my-noco-app/packages/plugins/my-plugin/src/server/actions/news.ts
 * stay hungry,stay foolish
 */
import { Context, Next } from '@nocobase/actions';
import actions from '@nocobase/actions';
import { BelongsToManyRepository} from "@nocobase/database";

export async function update(ctx: Context, next: Next) {
    

    let {readers} = ctx.request.body;
    let {filterByTk} = ctx.request.query;
     
    if (Object.keys(ctx.request.body).length == 1 && readers && filterByTk) { //只有关注
        const News = ctx.db.getCollection('news');
        const NewsReaderRepository = new BelongsToManyRepository(News, 'readers', filterByTk as string);
        let count = await NewsReaderRepository.count({filter:{
            id:readers
        }})
       
        if (count && count > 0) {
            await NewsReaderRepository.remove(readers)
            console.log(`取消订阅成功`)
        } else {
            await NewsReaderRepository.set([readers])
            console.log(`订阅成功`)
        }
        
        await next();
    } else{ //正常更新
        console.log(`更新`)
        await actions.update(ctx,next)
    }
  }