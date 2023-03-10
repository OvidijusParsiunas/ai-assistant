export class WebComponentStyleUtils {
  public static apply(style: string, shadowRoot: ShadowRoot | null, componentElement: HTMLElement) {
    if (!shadowRoot) return;
    try {
      WebComponentStyleUtils.applyStyleSheet(style, shadowRoot);
    } catch (err) {
      // fallback for if CSSStyleSheet is not supported (Safari)
      WebComponentStyleUtils.addStyleElement(style, componentElement, shadowRoot);
    }
  }

  private static applyStyleSheet(style: string, shadowRoot: ShadowRoot) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(style);
    shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  private static addStyleElement(style: string, componentElement: HTMLElement, shadowRoot: ShadowRoot) {
    const stylesDocument = document.createElement('style');
    stylesDocument.innerHTML = style;
    shadowRoot.insertBefore(stylesDocument, componentElement);
  }
}
