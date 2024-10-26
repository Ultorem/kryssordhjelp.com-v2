import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, Music, Globe, Building, Users, Book, 
  Utensils, Heart, Briefcase, Ship, Gamepad2,
  Palette, Brain, Cloud, Shopping
} from 'lucide-react';

const categories = [
  {
    name: 'Natur og Miljø',
    icon: Leaf,
    description: 'Ord relatert til dyr, planter, vær og naturlige fenomener',
    examples: ['fjell', 'elv', 'skog', 'regn', 'sol', 'vind'],
    seoTerms: ['natur', 'miljø', 'landskap', 'økologi', 'klima']
  },
  {
    name: 'Kultur og Kunst',
    icon: Palette,
    description: 'Ord innen musikk, litteratur, kunst og kulturuttrykk',
    examples: ['opera', 'teater', 'dans', 'maleri', 'skulptur'],
    seoTerms: ['kultur', 'kunst', 'underholdning', 'scene', 'museum']
  },
  {
    name: 'Mat og Drikke',
    icon: Utensils,
    description: 'Matlagingstermer, ingredienser og kulinariske uttrykk',
    examples: ['lefse', 'brunost', 'kjøttkaker', 'aquavit'],
    seoTerms: ['mat', 'drikke', 'oppskrift', 'ingrediens', 'kosthold']
  },
  {
    name: 'Geografi',
    icon: Globe,
    description: 'Stedsnavn, landformer og geografiske termer',
    examples: ['fjord', 'dal', 'øy', 'vidde', 'halvøy'],
    seoTerms: ['geografi', 'landskap', 'topografi', 'kart', 'sted']
  },
  {
    name: 'Arkitektur',
    icon: Building,
    description: 'Bygninger, konstruksjoner og arkitektoniske elementer',
    examples: ['stavkirke', 'hytte', 'stabbur', 'loft', 'naust'],
    seoTerms: ['arkitektur', 'bygning', 'konstruksjon', 'design']
  },
  {
    name: 'Personer og Yrker',
    icon: Users,
    description: 'Yrkestitler, roller og personbeskrivelser',
    examples: ['lærer', 'kunstner', 'bonde', 'fisker', 'lege'],
    seoTerms: ['yrke', 'profesjon', 'arbeid', 'stilling', 'karriere']
  },
  {
    name: 'Sport og Fritid',
    icon: Gamepad2,
    description: 'Sportsgrener, aktiviteter og fritidsord',
    examples: ['ski', 'fotball', 'friluftsliv', 'telemark'],
    seoTerms: ['sport', 'idrett', 'aktivitet', 'konkurranse', 'lek']
  },
  {
    name: 'Vitenskap og Teknologi',
    icon: Brain,
    description: 'Vitenskapelige termer og teknologiske uttrykk',
    examples: ['forskning', 'data', 'energi', 'atom', 'gen'],
    seoTerms: ['vitenskap', 'teknologi', 'forskning', 'innovasjon']
  },
  {
    name: 'Følelser og Relasjoner',
    icon: Heart,
    description: 'Følelsesuttrykk og mellommenneskelige relasjoner',
    examples: ['kjærlighet', 'vennskap', 'familie', 'glede'],
    seoTerms: ['følelse', 'relasjon', 'forhold', 'emosjon']
  },
  {
    name: 'Næringsliv',
    icon: Briefcase,
    description: 'Forretningstermer og økonomiske uttrykk',
    examples: ['bedrift', 'handel', 'marked', 'økonomi'],
    seoTerms: ['næringsliv', 'business', 'handel', 'økonomi']
  },
  {
    name: 'Maritim',
    icon: Ship,
    description: 'Sjøfart, fiske og maritime uttrykk',
    examples: ['båt', 'fiske', 'havn', 'sjø', 'bølge'],
    seoTerms: ['maritim', 'sjøfart', 'båt', 'hav', 'fiske']
  },
  {
    name: 'Litteratur',
    icon: Book,
    description: 'Litterære termer og bokuttrykk',
    examples: ['roman', 'dikt', 'saga', 'eventyr'],
    seoTerms: ['litteratur', 'bok', 'forfatter', 'poesi', 'prosa']
  }
];

const Categories: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Ordkategorier
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Utforsk ord og uttrykk innen forskjellige kategorier
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {category.name}
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {category.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {category.examples.map((example) => (
                  <Link
                    key={example}
                    to={`/ord/${example}`}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full 
                             text-blue-700 dark:text-blue-300 hover:bg-blue-100 
                             dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {example}
                  </Link>
                ))}
              </div>
              
              <div className="hidden">
                {/* SEO terms - hidden but available for search engines */}
                {category.seoTerms.join(', ')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;