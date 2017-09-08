import request from 'superagent';
import superagentcache from 'superagent-cache';
import { sprintf } from 'sprintf-js';
import {
	API_KEY,
	API_ENDPOINT_TEMPLATE,
} from 'setup/constants';
import type { section } from 'app/App';

superagentcache(request);

export default (section: section) => {
	const final_url = sprintf(API_ENDPOINT_TEMPLATE, {section});	
	return request
			.get(final_url)
			.expiration(15 * 60 * 4) // expire cache after 15 minutes
			.query({'api-key': API_KEY})
}