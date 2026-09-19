import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join, sep } from "path";

export async function POST(req: Request) {
	const configDir = join(process.cwd(), '..');
	const configPath = join(configDir, 'config.json');
	const config = JSON.parse(readFileSync(configPath, "utf-8"));
	
	const res = await req.json();
	const filePath = res.filePath as string;
	const resolution = res.resolution as 'x16' | 'x32';

	const relativePath = resolution === "x16" 
		? config.directories.default.replace("$root", config.directories.$root) + filePath.replace("assets", "")
		: config.directories.faithful.replace("$root", config.directories.$root) + filePath.replace("assets", "");

	const fullPath = join(configDir, relativePath);

	try {
		execSync(`explorer /select,"${fullPath.replaceAll('/', sep)}"`);
	} catch (err) {}

	return new Response('ok');
}