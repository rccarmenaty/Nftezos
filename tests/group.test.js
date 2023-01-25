const request = require("supertest");
const app = require("../app");

let token = "";
let groupId = 0;

describe("Group's CRUD Endpoints", () => {
  const name = "Grupo1";
  const description = "Description1";

  const createUser = async (username, email) => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Pedro",
      lastname: "Antonio",
      username,
      email,
      password: "rcty10543",
    });

    token = res.body.token;
  };

  it("Should create a new group and assign the user as owner", async () => {
    await createUser("pedro", "pedro@gmail.com");
    const response = await request(app)
      .post("/api/group/create")
      .set({ Authorization: "Bearer " + token })
      .send({
        name,
        description,
      });

    expect(response.statusCode).toEqual(201);

    const { group } = response.body;

    groupId = group.id;

    expect(group.Users.length).toEqual(1);
    expect(group.name).toEqual(name);
    expect(group.description).toEqual(description);
  });

  it("Should retrieve a group by its id", async () => {
    const response = await request(app)
      .get(`/api/group/read/${groupId}`)
      .set({ Authorization: "Bearer " + token })
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it("Should add a new User to a group", async () => {
    await createUser("abdul", "abdul@gmail.com");

    const users = ["abdul"];

    const response = await request(app)
      .put(`/api/group/add/${groupId}`)
      .set({ Authorization: "Bearer " + token })
      .send(users);
    expect(response.statusCode).toEqual(200);

    expect(response.body.Users.length).toEqual(2);
  });

  it("Should remove a User from a group", async () => {
    const users = ["abdul"];

    const response = await request(app)
      .put(`/api/group/remove/${groupId}`)
      .set({ Authorization: "Bearer " + token })
      .send(users);
    expect(response.statusCode).toEqual(200);
    expect(response.body.Users.length).toEqual(1);
  });

  it("Should the info of a Group", async () => {
    const response = await request(app)
      .put(`/api/group/update/${groupId}`)
      .set({ Authorization: "Bearer " + token })
      .send({ name: "Grupo2", description: "Description2" });
    expect(response.statusCode).toEqual(200);
    expect(response.body.group.name).toEqual("Grupo2");
    expect(response.body.group.description).toEqual("Description2");
  });
});
