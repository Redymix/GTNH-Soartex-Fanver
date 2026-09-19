import fs from 'node:fs';

import { packProgress } from './progress.ts';
import { PACK_MCMETA } from './constants.ts';

export async function updatePack(version: string, packGameVersion = version) {

	const percentage = packProgress();

	const packMCMETA = {
		pack: {
			pack_format: 1,
			description: `§6GT New Horizons §bSoartex Fanver x64 §6By Redymix §bv${version} §r(${percentage}% done)`
		},
		gtnh_resource_pack_updater: {
			schema: 1,
			pack_name: "GTNH Soartex Fanver x64",
			pack_version: version,
			pack_game_version: packGameVersion,
			source: {
				type: "github_releases",
				owner: "Redymix",
				repo: "GTNH-Soartex-Fanver"
			}
		},
	}

	fs.writeFileSync(PACK_MCMETA, JSON.stringify(packMCMETA, null, 2));
}
