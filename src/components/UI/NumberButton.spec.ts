import { DOMWrapper, shallowMount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, it, expect } from "vitest";
import NumberButton from "@/components/UI/NumberButton.vue";

type ButtonSizeType = "small" | "normal" | "vertical" | "horizontal";

type ButtonColorType = "standard" | "lightGray" | "blue" | "lightBlue";

type ButtonActionType = "action" | "number" | "operator";

interface ButtonProps {
  size?: ButtonSizeType;
  color?: ButtonColorType;
  type?: ButtonActionType;
}

function mountComponent(
  props: Partial<ButtonProps> = {}
): VueWrapper<InstanceType<typeof NumberButton>> {
  return shallowMount<typeof NumberButton>(NumberButton, {
    props: {
      ...props,
    },
  });
}

describe("[NumberButton] test", () => {
  let wrapper: VueWrapper<InstanceType<typeof NumberButton>> | undefined;

  describe("Test default props", () => {
    beforeEach(() => {
      wrapper = mountComponent();
    })

    it("size property should be normal", () => {
      expect(wrapper?.props("size")).toBe("normal");
    })

    it("color property should be standard", () => {
      expect(wrapper?.props("color")).toBe("standard");
    })

    it("type property should be normal", () => {
      expect(wrapper?.props("type")).toBe("action");
    })
  })

  describe("Should emit type on click", () => {
    it("should emit default prop", async () => {
      wrapper = mountComponent();
      const buttonComponent: DOMWrapper<HTMLDivElement> = wrapper.find<HTMLDivElement>(".button");

      expect(buttonComponent.exists()).toBeTruthy();

      await buttonComponent?.trigger("click");
      expect(wrapper.emitted("click")).toEqual([[wrapper.props("type")]]);
    })

    it("size property should be normal", async () => {
      wrapper = mountComponent({
        type: "operator",
      });
      const buttonComponent: DOMWrapper<HTMLDivElement> = wrapper.find<HTMLDivElement>(".button");

      expect(buttonComponent.exists()).toBeTruthy();

      await buttonComponent?.trigger("click");
      expect(wrapper.emitted("click")).toEqual([["operator"]]);
    })

    it("color property should be standard", async () => {
      wrapper = mountComponent({
        type: "number",
      });
      const buttonComponent: DOMWrapper<HTMLDivElement> = wrapper.find<HTMLDivElement>(".button");

      expect(buttonComponent.exists()).toBeTruthy();

      await buttonComponent?.trigger("click");
      expect(wrapper.emitted("click")).toEqual([["number"]]);
    })
  })

  describe("Test classes", () => {
    it("should emit default prop", () => {
      wrapper = mountComponent({
        size: "small",
      });
      const buttonComponent: DOMWrapper<HTMLDivElement> = wrapper.find<HTMLDivElement>(".button");

      expect(buttonComponent.exists()).toBeTruthy();
      expect(buttonComponent?.attributes('class'))
      expect(buttonComponent?.attributes('class')).toContain("button--small")
      expect(buttonComponent?.attributes('class')).toContain("button--standard")
    })
  })
})
