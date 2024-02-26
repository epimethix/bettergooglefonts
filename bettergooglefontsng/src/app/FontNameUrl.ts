export type FontNameUrl = {
  name: string;
  url: string;
  axes: any[];
};

export function generateFontCss(font: {name: string, url: string}) {
  return `@font-face {
    font-family: "${font.name}";
    src: url("${font.url}");
  }`;
}
export function appendStyleTag(css: string) {
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}
