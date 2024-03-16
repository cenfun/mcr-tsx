import { bar } from '../src/example.js';
import { add } from '../src/index.js';

describe('test bar', function() {

    it('test', function() {
        bar();
    });

    it('add', () => {
        add(1, 1);
    });

});

