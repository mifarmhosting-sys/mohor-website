// One-off helper: converts line ranges of the legacy index.html into JSX components.
// Usage: node scripts/html-to-jsx.mjs
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('..', 'index.html');
const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/);

const SVG_ATTRS = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  tabindex: 'tabIndex',
  class: 'className',
  for: 'htmlFor',
};
const VOID = ['img', 'br', 'input', 'hr'];

function convert(html) {
  let out = html.replace(/<!--[\s\S]*?-->/g, '');
  for (const [from, to] of Object.entries(SVG_ATTRS)) {
    out = out.replace(new RegExp(`(\\s)${from}=`, 'g'), `$1${to}=`);
  }
  // self-close void tags
  out = out.replace(new RegExp(`<(${VOID.join('|')})([^>]*?)\\s*/?>`, 'g'), '<$1$2 />');
  // internal html links -> next routes / static files
  out = out.replace(/href="index\.html#/g, 'href="/#').replace(/href="index\.html"/g, 'href="/"');
  // image paths -> absolute
  out = out.replace(/src="images\//g, 'src="/images/').replace(/href="images\//g, 'href="/images/');
  // boolean attrs
  out = out.replace(/\sdisabled(?=[\s>])/g, ' disabled').replace(/\shidden(?=[\s>])/g, ' hidden');
  return out;
}

function component(name, start, end, wrapper = true) {
  const body = convert(lines.slice(start - 1, end).join('\n'));
  const code = wrapper
    ? `export default function ${name}() {\n  return (\n    <>\n${body}\n    </>\n  );\n}\n`
    : body;
  fs.mkdirSync('components/sections', { recursive: true });
  fs.writeFileSync(`components/sections/${name}.js`, code);
  console.log('wrote', name);
}

component('Supporters', 171, 201);
component('ServicesOverview', 206, 330);
component('ServicesList', 335, 401);
component('Footer', 651, 711);
component('NavMenu', 22, 55);
