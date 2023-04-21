import { disconnectRedis } from "@utils/redis";
import { trpcRequest } from "../helpers/trpcRequest";

afterEach(() => {
  // reset mock should be in afterEach
  jest.resetAllMocks();
});

afterAll(() => {
  disconnectRedis();
});

describe("Product API", () => {
  it("should return a product", async () => {
    const res = await trpcRequest().example.hello();
    expect(res).toEqual({
      greeting: "This is me",
    });
  });
});
