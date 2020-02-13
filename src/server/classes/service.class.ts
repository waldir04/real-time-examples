export class ServiceClass {
    private static instances: { [key: string]: any } = {};

    public static getInstance(): any {
        const type = this.name;
        const instance = ServiceClass.instances[type];

        if (!instance) {
            ServiceClass.instances[type] = new this();
        }

        return ServiceClass.instances[type];
    }
}