/*
 * @Author: pangff
 * @Date: 2022-08-15 10:23:06
 * @LastEditTime: 2022-08-16 08:30:34
 * @LastEditors: pangff
 * @Description: 
 * @FilePath: /my-noco-app/packages/plugins/my-plugin/src/__tests__/order-hook.test.ts
 * stay hungry,stay foolish
 */
import { Application } from "@nocobase/server";
import request from "supertest";

class MockServer extends Application { }

describe("collections test", () => {
    let app: String;

    beforeEach(async () => {
        app = "http://localhost:13000";
    });

    it("create news and make news orders", async () => {
        // admin 登录
        let response = await request(app)
            .post("/api/users:signin")
            .send({
                email: "admin@nocobase.com",
                password: "admin123",
            });
        expect(response.statusCode).toEqual(200);
        let admin = response.body.data;
        expect(admin.token).toBeDefined();

        //创建新闻
        response = await request(app)
            .post("/api/news:create")
            .set("Authorization", `Bearer ${admin.token}`)
            .send({
                content: "科技"
            });
        expect(response.statusCode).toEqual(200);
        let news = response.body.data;

        //订阅
        response = await request(app)
            .post(`/api/news:update?filterByTk=${news.id}`)
            .set("Authorization", `Bearer ${admin.token}`)
            .send({
                readers: admin.id
            });
        expect(response.statusCode).toEqual(200);

        //查询
        response = await request(app)
            .get(`/api/news:get?filterByTk=${news.id}&appends%5B%5D=createdBy&appends%5B%5D=updatedBy&appends%5B%5D=readers`)
            .set("Authorization", `Bearer ${admin.token}`)
            .send();
        expect(response.statusCode).toEqual(200);
        news = response.body.data;
        expect(news.readers[0].id).toEqual(admin.id);

        // 取消订阅;
        response = await request(app)
            .post(`/api/news:update?filterByTk=${news.id}`)
            .set("Authorization", `Bearer ${admin.token}`)
            .send({
                readers: admin.id
            });
        expect(response.statusCode).toEqual(200);

        //查询
        response = await request(app)
            .get(`/api/news:get?filterByTk=${news.id}&appends%5B%5D=createdBy&appends%5B%5D=updatedBy&appends%5B%5D=readers`)
            .set("Authorization", `Bearer ${admin.token}`)
            .send();
        expect(response.statusCode).toEqual(200);
        news = response.body.data;
        expect(news.readers.length).toEqual(0);

        // 正常更新;
        response = await request(app)
            .post(`/api/news:update?filterByTk=${news.id}`)
            .set("Authorization", `Bearer ${admin.token}`)
            .send({
                content: 'admin'
            });
        expect(response.statusCode).toEqual(200);

         //查询
         response = await request(app)
         .get(`/api/news:get?filterByTk=${news.id}&appends%5B%5D=createdBy&appends%5B%5D=updatedBy&appends%5B%5D=readers`)
         .set("Authorization", `Bearer ${admin.token}`)
         .send();
        expect(response.statusCode).toEqual(200);
        news = response.body.data;
        expect(news.readers.length).toEqual(0);
        expect(news.content).toEqual('admin');


         //list查询
         response = await request(app)
         .get(`/api/news:list?pageSize=5`)
         .set("Authorization", `Bearer ${admin.token}`)
         .send();
        expect(response.statusCode).toEqual(200);
        let list = response.body.data;
        console.log(list)
    });

});
