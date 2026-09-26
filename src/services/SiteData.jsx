import React, { createContext, useContext, useEffect, useState } from "react";
import { crestoraApi } from "./api";

const SiteContext = createContext({
  home: null,
  projects: [],
  about: null,
  blogs: null,
  contact: null,
  filters: null,
  settings: null,
  ready: false,
});

export function SiteProvider({ children }) {
  const [state, setState] = useState({
    home: null,
    projects: [],
    about: null,
    blogs: null,
    contact: null,
    filters: null,
    settings: null,
    ready: false,
  });

  useEffect(() => {
    Promise.all([
      crestoraApi.home(),
      crestoraApi.projects(),
      crestoraApi.about(),
      crestoraApi.blogs(),
      crestoraApi.contact(),
      crestoraApi.filters(),
      crestoraApi.settings(),
    ])
      .then(([home, projects, about, blogs, contact, filters, settings]) => {
        setState({
          home: home.data,
          projects: projects.data || [],
          about: about.data,
          blogs: blogs.data,
          contact: contact.data,
          filters: filters.data,
          settings: settings.data,
          ready: true,
        });
      })
      .catch((err) => {
        console.warn("Crestora API unavailable", err);
        setState((prev) => ({ ...prev, ready: true }));
      });
  }, []);

  return <SiteContext.Provider value={state}>{children}</SiteContext.Provider>;
}

export function sectionItems(block) {
  if (Array.isArray(block) && block.length) return block;
  if (Array.isArray(block?.items) && block.items.length) return block.items;
  return null;
}

export function useSite() {
  return useContext(SiteContext);
}
