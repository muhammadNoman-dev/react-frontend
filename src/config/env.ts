interface EnvInterface {
	apiRoot: string;
}

const env: EnvInterface = {
	apiRoot: process.env.REACT_APP_BACKEND_ROOT || "",
};

export default env;
