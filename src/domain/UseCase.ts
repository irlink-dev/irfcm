export default abstract class UseCase<Request, Response> {

    abstract request(
        request: Request,
        onResponse: (response: Response) => any
    ): any

}
