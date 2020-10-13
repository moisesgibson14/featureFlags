import React, { useEffect, useState, createContext } from 'react';
import semverSatisfies from 'semver/functions/satisfies';
import { firebase } from '../firebase';

const FlagsContext = createContext({});
const remoteConfig = firebase.remoteConfig();

// For development only
remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
};

const FlagsProvider = ({ defaults, children }) => {
    const [flags, setFlags] = useState(defaults);

    useEffect(() => {
        console.log('Default ====>',defaults, 'Children ====>', children);
        remoteConfig.defaultConfig = defaults;
        remoteConfig
            .fetchAndActivate()
            .then(activated => {
                console.log(activated);
                if (!activated) console.log('not activated');
                return remoteConfig.getAll();
            })
            .then(remoteFlags => {
                console.log(remoteFlags);
                const newFlags = {
                    ...flags,
                };
                for (const [key, config] of Object.entries(remoteFlags)) {
                    const appVer = process.env.REACT_APP_VERSION;
                    newFlags[key] = semverSatisfies(appVer, config.asString());
                }
                console.log(newFlags);
                setFlags(newFlags);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <FlagsContext.Provider value={flags}>{children}</FlagsContext.Provider>
    );
};

export default FlagsProvider;