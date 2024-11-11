import React, { useState } from 'react';
import { offerCard, CityData, AppRoute, City } from '../../types';
import { ListOffers } from '../../components/list-offers/ListOffers';
import { useNavigate } from 'react-router-dom';
import { Map } from '../../components/map/Map';
import { CardClassNameList, SortName } from '../../types';
import { useAppDispatch } from '../../hooks';
import { changeSelectedCity } from '../../store/action';
import { ListCities } from '../../components/list-cities/ListCities';
import { FilterOffer } from '../../components/filter-offers/FilterOffer';

type MainProps = {
  offers: offerCard[];
  currentCity: CityData;
  cities: CityData[];
};

export const Main: React.FC<MainProps> = ({
  offers,
  currentCity,
  cities,
}:MainProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUserSelectCity = (cityName: City) => {
    dispatch(changeSelectedCity(cityName));
    // dispatch(fillOffers());
  };

  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  
  const [sortType, setSortType] = useState<SortName>(SortName.popular);
  const sortedOffers = offers.slice().sort((a, b) => {
    switch (sortType) {
      case SortName.lowToHigh:
        return a.price - b.price;
      case SortName.highToLow:
        return b.price - a.price;
      case SortName.topRated:
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <div className="header__logo-link header__logo-link--active"
                onClick={() =>
                  navigate(AppRoute.Main)}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </div>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ListCities currentCity={currentCity.title} cities={cities} onUserSelect={handleUserSelectCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {currentCity.title}
              </b>
              <FilterOffer currentSort={sortType} onSortChange={setSortType} />
              <div className="cities__places-list places__list tabs__content">
                <ListOffers offers={sortedOffers} cardClassName={CardClassNameList.citiesList} activeOffer={activeOffer} setActiveOffer={setActiveOffer} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map currentCity={currentCity} offers={sortedOffers} activeOffer={activeOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
