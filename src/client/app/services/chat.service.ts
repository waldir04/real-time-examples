import { ServiceClass } from '../classes/service.class';
import { of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retryWhen, mergeMap, delay } from 'rxjs/operators';
import { Api } from '../constants/api.const';

export class ChatService extends ServiceClass {

    private constructor() {
        super();
    }

    public getMessages(): Promise<any> {
        return ajax({
            url: `${Api.SERVER_URL}/chat/messages`,
            method: 'GET'
        }).pipe(
            map((data) => data.response )
        ).toPromise();
    }

    public sendMessage(message: string, username: string): Promise<any> {
        return ajax({
            url: `${Api.SERVER_URL}/chat/publish`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { message, username }
        }).toPromise();
    }

    public subscribe(): Promise<any> {
        return ajax({
            url: `${Api.SERVER_URL}/chat/subscribe`,
            method: 'GET'
        }).pipe(
            retryWhen((errors) => 
                errors.pipe(
                    mergeMap((error, index) => index < 12 ? of(error) : throwError(error)),
                    delay(5000)
                )
            ),
            map((data) => data.response )
        ).toPromise();
    }
}