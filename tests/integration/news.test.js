const request = require('supertest');
const { News } = require('../../models/newsModel');

let server;

describe('/api/news', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close();
        await News.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all news', async () => {
            await News.collection.insertMany([
                { title: 'Titre1'},
                { title: 'Titre2'}
            ]);

            const res = await request(server).get('/api/news');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(n => n.title === 'Titre1')).toBeTruthy();
            expect(res.body.some(n => n.title === 'Titre2')).toBeTruthy();
        });
    });

    describe('POST /', () => {
        it('should save the news if it is valid', async () => {
            
            const res = await request(server)
                .post('/api/news')
                .send({title: "Titre1"});

            const news = await News.find({ title: 'Titre1'});

            expect(news).not.toBeNull();
            
        });
        it('should return the news if it is valid', async () => {
            
            const res = await request(server)
                .post('/api/news')
                .send({title: "Titre1"});

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('title', 'Titre1');
            
        });
    });
});