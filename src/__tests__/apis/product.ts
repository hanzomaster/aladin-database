import { disconnectRedis } from "@utils/redis";
import { trpcRequest } from "../helpers/trpcRequest";

afterEach(() => {
  // reset mock should be in afterEach
  jest.resetAllMocks();
});

afterAll(() => {
  disconnectRedis();
});

describe("Test API", () => {
  it("should tell you who you are", async () => {
    const res = await trpcRequest().example.hello();
    expect(res).toEqual({
      greeting: "This is me",
    });
  });
});
