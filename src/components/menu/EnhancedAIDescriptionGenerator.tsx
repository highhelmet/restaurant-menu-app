import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageKey } from '@/types/menu';

// Food categories for customized descriptions
const FOOD_CATEGORIES = [
  { value: 'appetizer', label: 'Appetizer' },
  { value: 'soup', label: 'Soup' },
  { value: 'salad', label: 'Salad' },
  { value: 'pasta', label: 'Pasta' },
  { value: 'rice', label: 'Rice Dish' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'beef', label: 'Beef' },
  { value: 'pork', label: 'Pork' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'beverage', label: 'Beverage' },
];

interface EnhancedAIDescriptionGeneratorProps {
  foodName: { [key in LanguageKey]: string };
  currentDescription: { [key in LanguageKey]: string };
  onDescriptionGenerated: (description: { [key in LanguageKey]: string }) => void;
}

export function EnhancedAIDescriptionGenerator({ 
  foodName, 
  currentDescription, 
  onDescriptionGenerated 
}: EnhancedAIDescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [foodCategory, setFoodCategory] = useState<string>('');
  const [generatedDescriptions, setGeneratedDescriptions] = useState<{ [key in LanguageKey]: string }>({
    en: currentDescription.en || '',
    es: currentDescription.es || ''
  });
  const [activeLanguage, setActiveLanguage] = useState<LanguageKey>('en');

  // Update descriptions when props change
  useEffect(() => {
    setGeneratedDescriptions({
      en: currentDescription.en || '',
      es: currentDescription.es || ''
    });
  }, [currentDescription]);

  // Try to detect food category based on name
  useEffect(() => {
    if (!foodCategory && foodName.en) {
      const nameLower = foodName.en.toLowerCase();
      
      // Simple detection logic
      if (nameLower.includes('soup') || nameLower.includes('chowder') || nameLower.includes('bisque')) {
        setFoodCategory('soup');
      } else if (nameLower.includes('salad')) {
        setFoodCategory('salad');
      } else if (nameLower.includes('pasta') || nameLower.includes('spaghetti') || nameLower.includes('fettuccine')) {
        setFoodCategory('pasta');
      } else if (nameLower.includes('rice') || nameLower.includes('risotto') || nameLower.includes('paella')) {
        setFoodCategory('rice');
      } else if (nameLower.includes('fish') || nameLower.includes('shrimp') || nameLower.includes('lobster') || nameLower.includes('crab')) {
        setFoodCategory('seafood');
      } else if (nameLower.includes('chicken')) {
        setFoodCategory('chicken');
      } else if (nameLower.includes('beef') || nameLower.includes('steak')) {
        setFoodCategory('beef');
      } else if (nameLower.includes('pork')) {
        setFoodCategory('pork');
      } else if (nameLower.includes('cake') || nameLower.includes('ice cream') || nameLower.includes('dessert')) {
        setFoodCategory('dessert');
      } else if (nameLower.includes('appetizer') || nameLower.includes('starter')) {
        setFoodCategory('appetizer');
      }
    }
  }, [foodName, foodCategory]);

  const generateDescription = async (language: LanguageKey) => {
    if (!foodName[language]) return;
    
    setIsGenerating(true);
    
    try {
      // In a real application, this would call an AI service API with the food category
      // For now, we'll simulate the AI generation with predefined templates by category
      
      let description = '';
      const name = foodName[language];
      
      if (language === 'en') {
        // English templates by category
        const templates: {[key: string]: string[]} = {
          appetizer: [
            `Start your meal with our delicious ${name}, a perfect appetizer to awaken your taste buds with its rich flavors and exquisite presentation.`,
            `Our ${name} is the ideal way to begin your dining experience, featuring fresh ingredients and a harmonious blend of flavors that will leave you wanting more.`,
            `This delightful ${name} sets the stage for an unforgettable meal, combining traditional techniques with innovative touches for a truly remarkable starter.`
          ],
          soup: [
            `Our hearty ${name} is simmered to perfection, combining fresh ingredients and aromatic herbs for a comforting and flavorful experience.`,
            `Warm up with our delicious ${name}, a rich and satisfying soup made from scratch daily using only the finest ingredients.`,
            `This exquisite ${name} features a velvety texture and complex flavors, creating a harmonious balance that will delight your palate.`
          ],
          salad: [
            `Our crisp and refreshing ${name} combines garden-fresh ingredients with a light, tangy dressing for a perfect balance of flavors and textures.`,
            `Experience the vibrant flavors of our ${name}, featuring seasonal produce and a house-made dressing that elevates this salad to new heights.`,
            `This colorful ${name} is a celebration of freshness, with crisp vegetables, premium toppings, and a delicate dressing that enhances every bite.`
          ],
          pasta: [
            `Our ${name} features perfectly cooked pasta tossed in a rich, flavorful sauce made from traditional recipes passed down through generations.`,
            `Indulge in our delicious ${name}, where al dente pasta meets a sumptuous sauce created with premium ingredients for an authentic taste experience.`,
            `This classic ${name} showcases the perfect harmony between tender pasta and our signature sauce, creating a dish that's both comforting and sophisticated.`
          ],
          rice: [
            `Our flavorful ${name} combines perfectly cooked rice with premium ingredients, creating a satisfying dish that's both aromatic and delicious.`,
            `Experience the rich flavors of our ${name}, where each grain of rice is infused with a harmonious blend of spices and complementary ingredients.`,
            `This exquisite ${name} showcases the versatility of rice, elevated with carefully selected ingredients and expert preparation techniques.`
          ],
          seafood: [
            `Our ${name} features the freshest catch of the day, prepared with precision to highlight its natural flavors and delicate texture.`,
            `Indulge in our exceptional ${name}, where premium seafood is enhanced with complementary ingredients and expert cooking techniques.`,
            `This outstanding ${name} celebrates the bounty of the sea, prepared in a way that preserves its freshness while adding subtle, complementary flavors.`
          ],
          chicken: [
            `Our tender and juicy ${name} is prepared to perfection, featuring succulent chicken enhanced with a harmonious blend of seasonings and accompaniments.`,
            `Experience the exceptional flavor of our ${name}, where quality chicken is transformed through expert preparation and complementary ingredients.`,
            `This delicious ${name} showcases chicken at its finest, with a perfect balance of tenderness, flavor, and thoughtful preparation.`
          ],
          beef: [
            `Our premium ${name} features carefully selected beef, cooked to your preference and enhanced with rich, complementary flavors.`,
            `Indulge in our exceptional ${name}, where high-quality beef is the star, prepared with precision and paired with thoughtfully chosen accompaniments.`,
            `This outstanding ${name} celebrates the natural flavor of fine beef, elevated through expert preparation and complementary ingredients.`
          ],
          pork: [
            `Our tender ${name} features succulent pork prepared with care to enhance its natural flavors and create a truly satisfying dish.`,
            `Experience the exceptional taste of our ${name}, where quality pork is transformed through expert preparation and complementary ingredients.`,
            `This delicious ${name} showcases pork at its finest, with a perfect balance of tenderness, flavor, and thoughtful preparation.`
          ],
          vegetarian: [
            `Our vibrant ${name} celebrates the bounty of fresh vegetables, combining diverse textures and flavors for a satisfying vegetarian experience.`,
            `Indulge in our creative ${name}, where plant-based ingredients are transformed into a dish that's both nutritious and incredibly flavorful.`,
            `This thoughtfully prepared ${name} proves that vegetarian cuisine can be both exciting and satisfying, with layers of flavor in every bite.`
          ],
          dessert: [
            `Our decadent ${name} provides the perfect sweet ending to your meal, combining rich flavors and exquisite textures for a memorable dessert experience.`,
            `Indulge your sweet tooth with our delicious ${name}, a dessert that balances sweetness with complexity for a truly satisfying finale.`,
            `This irresistible ${name} showcases the art of dessert-making, with careful attention to flavor, texture, and presentation.`
          ],
          beverage: [
            `Our refreshing ${name} is the perfect accompaniment to your meal, offering a balanced blend of flavors to complement your dining experience.`,
            `Quench your thirst with our delicious ${name}, crafted with quality ingredients for a beverage that's both refreshing and flavorful.`,
            `This exceptional ${name} elevates your dining experience with its thoughtful preparation and perfect balance of flavors.`
          ],
          default: [
            `Our delicious ${name} is prepared with the finest ingredients, creating a perfect balance of flavors that will delight your taste buds.`,
            `Experience the authentic taste of our ${name}, carefully crafted by our expert chefs using traditional techniques and premium ingredients.`,
            `Indulge in our mouthwatering ${name}, a customer favorite that combines rich flavors and perfect textures for an unforgettable dining experience.`
          ]
        };
        
        const categoryTemplates = templates[foodCategory] || templates.default;
        description = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
      } else {
        // Spanish templates by category
        const templates: {[key: string]: string[]} = {
          appetizer: [
            `Comience su comida con nuestro delicioso ${name}, un aperitivo perfecto para despertar sus papilas gustativas con sus ricos sabores y exquisita presentación.`,
            `Nuestro ${name} es la forma ideal de comenzar su experiencia gastronómica, con ingredientes frescos y una armoniosa mezcla de sabores que le dejará con ganas de más.`,
            `Este delicioso ${name} prepara el escenario para una comida inolvidable, combinando técnicas tradicionales con toques innovadores para un entrante verdaderamente extraordinario.`
          ],
          soup: [
            `Nuestra sustanciosa ${name} está cocida a fuego lento hasta la perfección, combinando ingredientes frescos y hierbas aromáticas para una experiencia reconfortante y sabrosa.`,
            `Caliéntese con nuestra deliciosa ${name}, una sopa rica y satisfactoria hecha desde cero diariamente usando solo los mejores ingredientes.`,
            `Esta exquisita ${name} presenta una textura aterciopelada y sabores complejos, creando un equilibrio armonioso que deleitará su paladar.`
          ],
          salad: [
            `Nuestra crujiente y refrescante ${name} combina ingredientes frescos del jardín con un aderezo ligero y ácido para un equilibrio perfecto de sabores y texturas.`,
            `Experimente los vibrantes sabores de nuestra ${name}, con productos de temporada y un aderezo casero que eleva esta ensalada a nuevas alturas.`,
            `Esta colorida ${name} es una celebración de frescura, con vegetales crujientes, coberturas premium y un delicado aderezo que realza cada bocado.`
          ],
          pasta: [
            `Nuestra ${name} presenta pasta perfectamente cocida bañada en una salsa rica y sabrosa elaborada con recetas tradicionales transmitidas de generación en generación.`,
            `Deléitese con nuestra deliciosa ${name}, donde la pasta al dente se encuentra con una suntuosa salsa creada con ingredientes premium para una auténtica experiencia de sabor.`,
            `Esta clásica ${name} muestra la perfecta armonía entre la pasta tierna y nuestra salsa distintiva, creando un plato que es a la vez reconfortante y sofisticado.`
          ],
          rice: [
            `Nuestro sabroso ${name} combina arroz perfectamente cocido con ingredientes premium, creando un plato satisfactorio que es tanto aromático como delicioso.`,
            `Experimente los ricos sabores de nuestro ${name}, donde cada grano de arroz está infundido con una mezcla armoniosa de especias e ingredientes complementarios.`,
            `Este exquisito ${name} muestra la versatilidad del arroz, elevado con ingredientes cuidadosamente seleccionados y técnicas de preparación expertas.`
          ],
          seafood: [
            `Nuestro ${name} presenta la pesca más fresca del día, preparada con precisión para resaltar sus sabores naturales y delicada textura.`,
            `Deléitese con nuestro excepcional ${name}, donde los mariscos premium se realzan con ingredientes complementarios y técnicas de cocina expertas.`,
            `Este excepcional ${name} celebra la generosidad del mar, preparado de una manera que preserva su frescura mientras añade sabores sutiles y complementarios.`
          ],
          chicken: [
            `Nuestro tierno y jugoso ${name} está preparado a la perfección, presentando pollo suculento realzado con una mezcla armoniosa de condimentos y acompañamientos.`,
            `Experimente el sabor excepcional de nuestro ${name}, donde el pollo de calidad se transforma a través de una preparación experta e ingredientes complementarios.`,
            `Este delicioso ${name} muestra el pollo en su máxima expresión, con un equilibrio perfecto de ternura, sabor y preparación cuidadosa.`
          ],
          beef: [
            `Nuestro premium ${name} presenta carne de res cuidadosamente seleccionada, cocinada a su preferencia y realzada con sabores ricos y complementarios.`,
            `Deléitese con nuestro excepcional ${name}, donde la carne de res de alta calidad es la estrella, preparada con precisión y emparejada con acompañamientos cuidadosamente elegidos.`,
            `Este excepcional ${name} celebra el sabor natural de la carne de res fina, elevada a través de una preparación experta e ingredientes complementarios.`
          ],
          pork: [
            `Nuestro tierno ${name} presenta cerdo suculento preparado con cuidado para realzar sus sabores naturales y crear un plato verdaderamente satisfactorio.`,
            `Experimente el sabor excepcional de nuestro ${name}, donde el cerdo de calidad se transforma a través de una preparación experta e ingredientes complementarios.`,
            `Este delicioso ${name} muestra el cerdo en su máxima expresión, con un equilibrio perfecto de ternura, sabor y preparación cuidadosa.`
          ],
          vegetarian: [
            `Nuestro vibrante ${name} celebra la generosidad de vegetales frescos, combinando diversas texturas y sabores para una experiencia vegetariana satisfactoria.`,
            `Deléitese con nuestro creativo ${name}, donde los ingredientes de origen vegetal se transforman en un plato que es tanto nutritivo como increíblemente sabroso.`,
            `Este ${name} preparado cuidadosamente demuestra que la cocina vegetariana puede ser tanto emocionante como satisfactoria, con capas de sabor en cada bocado.`
          ],
          dessert: [
            `Nuestro decadente ${name} proporciona el perfecto final dulce para su comida, combinando sabores ricos y texturas exquisitas para una experiencia de postre memorable.`,
            `Consienta su gusto por lo dulce con nuestro delicioso ${name}, un postre que equilibra la dulzura con la complejidad para un final verdaderamente satisfactorio.`,
            `Este irresistible ${name} muestra el arte de la elaboración de postres, con atención cuidadosa al sabor, textura y presentación.`
          ],
          beverage: [
            `Nuestra refrescante ${name} es el acompañamiento perfecto para su comida, ofreciendo una mezcla equilibrada de sabores para complementar su experiencia gastronómica.`,
            `Sacie su sed con nuestro delicioso ${name}, elaborado con ingredientes de calidad para una bebida que es tanto refrescante como sabrosa.`,
            `Este excepcional ${name} eleva su experiencia gastronómica con su preparación cuidadosa y equilibrio perfecto de sabores.`
          ],
          default: [
            `Nuestro delicioso ${name} está preparado con los mejores ingredientes, creando un equilibrio perfecto de sabores que deleitará su paladar.`,
            `Experimente el auténtico sabor de nuestro ${name}, cuidadosamente elaborado por nuestros chefs expertos utilizando técnicas tradicionales e ingredientes premium.`,
            `Deléitese con nuestro apetitoso ${name}, un favorito de los clientes que combina ricos sabores y texturas perfectas para una experiencia gastronómica inolvidable.`
          ]
        };
        
        const categoryTemplates = templates[foodCategory] || templates.default;
        description = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
      }
      
      // Update the generated descriptions
      setGeneratedDescriptions(prev => ({
        ...prev,
        [language]: description
      }));
      
      // Call the callback with the updated descriptions
      onDescriptionGenerated({
        ...generatedDescriptions,
        [language]: description
      });
      
    } catch (error) {
      console.error('Error generating description:', error);
      // Handle error
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBothLanguages = async () => {
    setIsGenerating(true);
    
    try {
      await generateDescription('en');
      await generateDescription('es');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">AI Description Generator</h3>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={activeLanguage === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLanguage('en')}
              >
                English
              </Button>
              <Button
                type="button"
                variant={activeLanguage === 'es' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLanguage('es')}
              >
                Español
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Food Category</label>
            <Select
              value={foodCategory}
              onValueChange={setFoodCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select food category" />
              </SelectTrigger>
              <SelectContent>
                {FOOD_CATEGORIES.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Selecting a category helps generate more relevant descriptions
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">
                {activeLanguage === 'en' ? 'English Description' : 'Spanish Description'}
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => generateDescription(activeLanguage)}
                disabled={isGenerating || !foodName[activeLanguage] || !foodCategory}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>
            </div>
            <Textarea
              value={generatedDescriptions[activeLanguage]}
              onChange={(e) => {
                const newDesc = e.target.value;
                setGeneratedDescriptions(prev => ({ ...prev, [activeLanguage]: newDesc }));
                onDescriptionGenerated({ ...generatedDescriptions, [activeLanguage]: newDesc });
              }}
              placeholder={`Item description in ${activeLanguage === 'en' ? 'English' : 'Spanish'}`}
              rows={4}
            />
          </div>
          
          <Button
            type="button"
            onClick={generateBothLanguages}
            disabled={isGenerating || !foodName.en || !foodName.es || !foodCategory}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : 'Generate Descriptions in Both Languages'}
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>AI-generated descriptions are based on the food name and category. Edit as needed after generation.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
