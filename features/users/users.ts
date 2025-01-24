import type { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { before, binding, given, then, when } from 'cucumber-tsflow';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../../src/app.module';
import { User } from '../../src/entities/user.entity';

class Context {
  public app: INestApplication<any>;
  public response;
}

@binding([Context])
class UsersSteps {
  private user: { username: string; password: string };
  private readonly jwtService: JwtService;

  constructor(protected context: Context) {
    this.jwtService = new JwtService({ secret: process.env.JWT_SECRET });
  }

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    await this.context.app.init();

    const dataSource = this.context.app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(User).execute();
  }

  @given(/my user name is "([^"]*)" and my password "([^"]*)"/)
  public givenImAUserWithNameAndPassword(username, password) {
    this.user = { username, password };
  }

  @when('I register an account')
  public async whenIARegisterAnAccount() {
    await request(this.context.app.getHttpServer())
      .post('/users/register')
      .send(this.user)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .then(async (response) => {
        expect(response.body).to.have.property('access_token');
        expect(response.body.access_token).to.be.a('string');

        const payload = await this.jwtService.verifyAsync(
          response.body.access_token,
        );

        expect(payload['username']).to.be.equal(this.user.username);
      });
  }

  @then(/my account is created/)
  public async thenMyAccountIsCreated() {
    const dataSource = this.context.app.get(DataSource);
    await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: this.user.username })
      .getOneOrFail();
  }

  @when('I register an account that already exists')
  public async whenIARegisterAnAccountThatAlreadyExists() {
    const dataSource = this.context.app.get(DataSource);
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(this.user)
      .execute();

    await request(this.context.app.getHttpServer())
      .post('/users/register')
      .send(this.user)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(500)
      .then((response) => {
        this.context.response = response.body;
      });
  }

  @then(/the account can't be created/)
  public async thenTheAccountIsNotCreated() {
    expect(this.context.response).to.be.deep.equal({
      statusCode: 500,
      message: "Une erreur est survenue lors de l'enregistrement",
    });
  }
}

export = UsersSteps;
