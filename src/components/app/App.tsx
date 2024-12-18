import { useAppSelector } from '../../hooks';
import { Main } from '../../pages/main/Main';
import { AppRoute } from '../../types/index';
import { Login } from '../../pages/login/Login';
import { Favorites } from '../../pages/favorites/Favorites';
import { Offer } from '../../pages/offer/Offer';
import { NotFound } from '../../pages/not-found/NotFound';
import { PrivateRoute } from '../../components/private-router/PrivateRouter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useInitApp } from '../../hooks/use-init-app';

// import { CityData, offerCard } from '../../types';

// interface IAppProps {
//   offers: offerCard[];
//   currentCity: CityData;
// }

export const App: React.FC = () => {
  useInitApp();

  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);
  const cities = useAppSelector((state) => state.cities);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main offers={offers} currentCity={currentCity} cities={cities}/>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={`${AppRoute.Offer}:id`}
          element={<Offer />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};
