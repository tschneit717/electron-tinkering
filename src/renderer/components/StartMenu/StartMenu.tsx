import { LegacyRef, createRef, useEffect, useState } from 'react'
import styles from './StartMenu.module.css'
import cn from 'classnames'

interface StartMenuProps {
  links: {
    name: string
    path: string
  }[]
}

export default function StartMenu({ links }: StartMenuProps) {
  const linksLength = links.length;
  const [elRefs, setElRefs] = useState<LegacyRef<HTMLAnchorElement>[]>([]);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
  // add or remove refs
    setElRefs((elRefs) =>
      Array(linksLength)
        .fill(undefined)
        .map((_, i) => elRefs[i] || createRef()),
    );
  }, [linksLength]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveItem((prevActiveItem) =>
        prevActiveItem === 0 ? linksLength - 1 : prevActiveItem - 1,
      );
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveItem((prevActiveItem) => (prevActiveItem + 1) % linksLength);
    }
  }

  useEffect(() => {
    elRefs[activeItem]?.current?.focus();
  }, [activeItem])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  useEffect(() => {
    elRefs[0]?.current?.focus();
  }, [elRefs]);
  return (
    <ul className="list-none flex flex-col gap-4 mt-12">
      {links.map((link, i) => (
        <li 
          className={cn(styles.startMenuItem, 'relative',  { [styles.startMenuItemActive]: activeItem === i })}
          key={link.name}>
          <a onFocus={() => setActiveItem(i)} ref={elRefs[i]} href={link.path}>{link.name}</a>
        </li>
      ))}
    </ul>
  );
}