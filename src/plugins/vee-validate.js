import {configure} from 'vee-validate';

const config = {
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid'
    },
    bails: true,
    skipOptional: true,
    mode: 'aggressive',
    useConstraintAttrs: true
};

// Sets the options.
configure(config);