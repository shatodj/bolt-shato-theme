// Standalone project jQuery
import _$ from 'jquery';
import 'magnific-popup';

import { dispatch } from './partials/lazy-module';

//  jQuery plugins
import 'magnific-popup/src/css/main.scss';

dispatch('JQUERY', _$);
window.$ = _$;

export default _$;
