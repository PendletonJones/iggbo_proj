import request from 'superagent';
import { sprintf } from 'sprintf-js';
import {
	API_KEY,
	API_ENDPOINT_TEMPLATE,
} from 'setup/constants';
import type { section } from 'app/App';

console.log(request);


export default (section: section) => {
	const final_url = sprintf(API_ENDPOINT_TEMPLATE, {section});	
	return request
			.get(final_url)
			.query({'api-key': API_KEY})
}