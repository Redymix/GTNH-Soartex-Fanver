import { copyFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join, sep } from "path";

export async function POST(req: Request) {
	const configDir = join(process.cwd(), '..');
	const configPath = join(configDir, 'config.json');
	const config = JSON.parse(readFileSync(configPath, "utf-8"));
	
	const res = await req.json();
	const filePath = res.filePath as string;

	const x16fullPath = join(configDir, config.directories.default.replace("$root", config.directories.$root) + filePath.replace("assets", ""));
	const x32fullPath = join(configDir, config.directories.faithful.replace("$root", config.directories.$root) + filePath.replace("assets", ""));

	const x32Dir = x32fullPath.includes(sep) 
		? x32fullPath.split(sep).slice(0, -1).join('/') 
		: x32fullPath.split('/').slice(0, -1).join('/')
		;

	if (!existsSync(x32Dir)) mkdirSync(x32Dir, { recursive: true });

	// copy x16 to x32
	copyFileSync(x16fullPath, x32fullPath);

	if (existsSync(x16fullPath + '.mcmeta')) {
		copyFileSync(x16fullPath + '.mcmeta', x32fullPath + '.mcmeta');
	}

	return new Response('ok');
}