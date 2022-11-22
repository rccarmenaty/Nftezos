const request = require("supertest");
const app = require("../app");

describe("User Register Endpoints", () => {
  it("Should fail registering an user with information incomplete", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "",
      lastname: "Almeida Gilart",
      username: "juanalmeida",
      email: "juan@test.com",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("User info should be complete");
  });

  it("Should fail registering an user with information incomplete", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Juan",
      username: "juanalmeida",
      email: "juan@test.com",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("User info should be complete");
  });

  it("Should fail registering an user with invalid email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Juan",
      lastname: "Almeida Gilart",
      username: "juanalmeida",
      email: "juan@gmail",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Email format is not correct");
  });

  it("Should register a new User with all valid fields", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Juan",
      lastname: "Almeida Gilart",
      username: "juanalmeida",
      email: "juanalmeida@test.com",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body).toHaveProperty("username");
  });

  it("Should fail registering an user with existing username", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Juan",
      lastname: "Almeida Gilart",
      username: "juanalmeida",
      email: "juan@test.com",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Username already exists");
  });

  it("Should fail registering an user with existing email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Juan",
      lastname: "Almeida Gilart",
      username: "almeida",
      email: "juanalmeida@test.com",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Email already exists");
  });

  it("Should fail registering an user providing password shorter than 6 characters in lenght", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Juan",
      lastname: "Almeida Gilart",
      username: "almeida",
      email: "juanalmeida@test.com",
      password: "almei",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Password should be at least 6 characters");
  });
});

describe("User Log In Endpoints", () => {
  it("Should log in a user with valid username and password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "juanalmeida",
      password: "almeidagilart10",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body).toHaveProperty("username");
  });

  it("Should fail to log in a user with incorrect credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "juanalmeida",
      password: "almeidagilart",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Username or password incorrect");
  });
});
