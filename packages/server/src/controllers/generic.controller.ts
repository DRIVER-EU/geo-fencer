import { Controller, All } from '@nestjs/common';

@Controller() // Matches "/"
export class GenericController {

    @All() // Matches "*" on all methods GET, POST...
    all() {
        return 'Geo fencer service running';
    }
}