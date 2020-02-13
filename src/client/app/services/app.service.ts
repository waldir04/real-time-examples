import { ServiceClass } from '../classes/service.class';

export class AppService extends ServiceClass{
    private $container: HTMLElement;

    private constructor() {
        super();
    }

    public get appContainer(): HTMLElement {
        return this.$container;
    }

    public set appContainer(container: HTMLElement) {
        this.$container = container;
    }

    public initialize(container: HTMLElement, component: any): void {
        this.$container = container;
        new component().render();
    }

    public render(element: string): void {
        this.$container.innerHTML = element;        
    }
}