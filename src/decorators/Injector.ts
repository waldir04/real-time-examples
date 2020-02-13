import 'reflect-metadata';

export const Injector = new class {
    resolve<T>(target: any): T {
        let tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Injector.resolve<any>(token));

        return new target(...injections);
    }
};