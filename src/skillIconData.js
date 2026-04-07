/**
 * SVG path data for skill tags (Simple Icons, CC0). VS Code uses a generic editor glyph — not in Simple Icons.
 */
import {
  siBootstrap,
  siCodeigniter,
  siCss,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJquery,
  siLaravel,
  siMongodb,
  siMysql,
  siNodedotjs,
  siPhp,
  siPostman,
  siReact,
  siSupabase,
  siTailwindcss,
  siVuedotjs,
} from 'simple-icons'

/** Material-style “sync” — represents async HTTP (Ajax). */
const AJAX_PATH =
  'M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.27 14A6.002 6.002 0 0 1 6 12c0-3.31 2.69-6 6-6zm6.76 4.74L17.73 16A5.97 5.97 0 0 1 12 18c-3.31 0-6-2.69-6-6 0-1.29.41-2.48 1.11-3.47L8.41 10H6c0 3.31 2.69 6 6 6 4.42 0 8-3.58 8-8v-3l-4 4 4 4v-3c0-.37-.02-.73-.06-1.09-.05-.45-.12-.89-.18-1.17z'

/** Filled “code window” glyph (VS Code isn’t in Simple Icons). */
const VSCODE_PATH =
  'M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v10h12V6H6Zm1 2h10v1.5H7V8Zm0 3h6v1.5H7v-1.5Z'

const bySimple = (si) => ({ path: si.path, title: si.title, hex: si.hex })

/** Brand fills that disappear on dark UI — swap to light ink. */
const DARK_THEME_LIGHT_FILL = new Set(['000000', '181717', '24292F', '212121'])

/**
 * @param {string | undefined} hex Simple Icons hex without '#'
 * @param {boolean} isDarkMode
 */
export function skillIconFill(hex, isDarkMode) {
  if (!hex) return 'currentColor'
  const h = hex.toUpperCase()
  if (isDarkMode && DARK_THEME_LIGHT_FILL.has(h)) return '#f0f4f8'
  return `#${hex}`
}

/** @type {Record<string, { path: string; title: string; hex?: string }>} */
export const skillIconByName = {
  HTML5: bySimple(siHtml5),
  CSS3: bySimple(siCss),
  'Bootstrap 3, 4, & 5': bySimple(siBootstrap),
  'Tailwind CSS': bySimple(siTailwindcss),
  JavaScript: bySimple(siJavascript),
  jQuery: bySimple(siJquery),
  Ajax: { path: AJAX_PATH, title: 'Ajax', hex: '0769AD' },
  Vue: bySimple(siVuedotjs),
  React: bySimple(siReact),
  PHP: bySimple(siPhp),
  'CodeIgniter (2, 3 & 4 - MVC)': bySimple(siCodeigniter),
  Laravel: bySimple(siLaravel),
  'Express.js': bySimple(siExpress),
  'Node.js': bySimple(siNodedotjs),
  MySQL: bySimple(siMysql),
  MongoDB: bySimple(siMongodb),
  Supabase: bySimple(siSupabase),
  'Version Control (Git & SVN)': bySimple(siGit),
  GitHub: bySimple(siGithub),
  'VS Code': { path: VSCODE_PATH, title: 'Visual Studio Code', hex: '007ACC' },
  Postman: bySimple(siPostman),
}

export function getSkillIconData(name) {
  return skillIconByName[name] ?? null
}
