import MessageDisplay from "@/components/MessageDisplay";
import { mount } from "@vue/test-utils";
import { getMessage } from "@/services/axios";
import flushPromises from "flush-promises";

jest.mock("@/services/axios");
beforeEach(() => {
  jest.clearAllMocks();
});

describe("MessageDisplay", () => {
  it("Calls getMessage and displays message", async () => {
    const mockMessage = "Hello from the db!";
    //mock api call
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);

    //wait for promise to resolve
    await flushPromises();

    //check that call happend once
    expect(getMessage).toHaveBeenCalledTimes(1);

    //check that component displays message
    const message = wrapper.find('[data-testid="message"]').text();
    expect(message).toEqual(mockMessage);
  });

  it("Displays and error when getMessage call fails", async () => {
    const mockError = "Oops! Something went wrong.";
    //mock the failed API call
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);
    //wait for promsie to resolve
    await flushPromises();
    //check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1);
    //check that component displays error
    const message = wrapper.find('[data-testid="message-error"]').text();
    expect(message).toEqual(mockError);
  });
});
