export default function({ $auth }) {
    $auth.getToken = (parameters) => {
        return $auth.strategy.token.get(parameters)
    };
}