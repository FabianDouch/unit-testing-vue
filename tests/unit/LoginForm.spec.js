import LoginForm from "@/components/LoginForm";
import { mount } from "@vue/test-utils";
describe("LoginForm", () => {
  it("emits an event with a user data payload", () => {
    const wrapper = mount(LoginForm);
    // find text input
    const input = wrapper.find('[data-testid="name-input"]');
    // set value for text input
    input.setValue("Test Man");
    // Simulate form submission
    wrapper.trigger("submit");
    // assert event has been emitted
    const formSubmittedCalls = wrapper.emitted("formSubmitted");
    expect(formSubmittedCalls).toHaveLength(1);
    // Assert payload is correct
    const expectedPayload = { name: "Test Man" };
    expect(wrapper.emitted("formSubmitted")[0][0]).toMatchObject(
      expectedPayload
    );
  });
});
