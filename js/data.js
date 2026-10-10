/**
 * Quiz Master - Question & Curriculum Database
 * Tailored for Class 6 & 7 Students
 * Curated for Member 2 (Quiz/Questions Lead) to easily edit and extend!
 */

const QUIZ_DATA = {
  subjects: [
    {
      id: "science",
      title: "Science",
      icon: "🔬",
      badge: "Discovery",
      color: "#10b981",
      bgColor: "#ecfdf5",
      description: "Explore living organisms, nutrition, forces, and nature's mysteries.",
      topics: [
        {
          id: "components-of-food",
          title: "Components of Food & Nutrition",
          icon: "🥗",
          summary: {
            headline: "Chapter Overview: Components of Food",
            keyPoints: [
              "Nutrients are chemical substances in food needed for growth, energy, and body repair.",
              "Major nutrients: Carbohydrates (energy providers like wheat, rice), Fats (concentrated energy like butter, oil), Proteins (body-building foods like pulses, milk, eggs), Vitamins & Minerals (protective foods against diseases).",
              "Dietary fibres (roughage) help in smooth digestion and preventing constipation.",
              "Water helps the body absorb nutrients and eliminate wastes as urine and sweat.",
              "Deficiency Diseases occur due to prolonged lack of nutrients (e.g., Vitamin A causes Night Blindness, Vitamin C causes Scurvy, Vitamin D causes Rickets, Iron causes Anemia)."
            ],
            keyFormulasOrTips: "💡 Balanced Diet = Right proportion of carbs, fats, proteins, vitamins, minerals, water, and roughage.",
            funFact: "Did you know? Citrus fruits like oranges and lemons are rich in Vitamin C, which gets destroyed easily by heat during cooking!"
          },
          questions: [
            {
              id: "sci-food-e1",
              difficulty: "easy",
              question: "Which nutrient is known as the primary 'energy-giving' food?",
              options: ["Proteins", "Carbohydrates", "Vitamins", "Roughage"],
              correctIndex: 1,
              explanation: "Carbohydrates provide instant energy to our body. Common sources include rice, wheat, and potatoes."
            },
            {
              id: "sci-food-e2",
              difficulty: "easy",
              question: "Night blindness is caused by the deficiency of which vitamin?",
              options: ["Vitamin C", "Vitamin D", "Vitamin A", "Vitamin B1"],
              correctIndex: 2,
              explanation: "Deficiency of Vitamin A impairs vision in dim light, leading to night blindness."
            },
            {
              id: "sci-food-m1",
              difficulty: "medium",
              question: "Which chemical solution turns blue-black in the presence of starch?",
              options: ["Copper sulphate", "Caustic soda", "Iodine solution", "Hydrochloric acid"],
              correctIndex: 2,
              explanation: "A dilute solution of iodine turns blue-black when it reacts with starch (tested on potato or rice)."
            },
            {
              id: "sci-food-m2",
              difficulty: "medium",
              question: "Why is roughage (dietary fibre) essential even though it provides no energy?",
              options: [
                "It builds muscle mass",
                "It aids bowel movements and removes undigested food",
                "It pumps extra blood",
                "It sharpens eye sight"
              ],
              correctIndex: 1,
              explanation: "Roughage adds bulk to food, helping muscles of the digestive tract push food along smoothly."
            },
            {
              id: "sci-food-c1",
              difficulty: "challenge",
              question: "A child has swollen gums, bleeding teeth, and wounds take longer to heal. Which disease is this?",
              options: ["Beriberi", "Scurvy", "Rickets", "Goitre"],
              correctIndex: 1,
              explanation: "Scurvy is caused by Vitamin C deficiency, leading to bleeding gums and delayed wound healing."
            },
            {
              id: "sci-food-c2",
              difficulty: "challenge",
              question: "To test for protein in a food sample, which combination of solutions is used?",
              options: [
                "Iodine and water",
                "Copper sulphate and caustic soda",
                "Alcohol and vinegar",
                "Salt water and lemon juice"
              ],
              correctIndex: 1,
              explanation: "A violet color appears when copper sulphate and caustic soda (sodium hydroxide) react with proteins."
            }
          ]
        },
        {
          id: "living-organisms",
          title: "Living Organisms & Their Surroundings",
          icon: "🌿",
          summary: {
            headline: "Chapter Overview: Habitats & Adaptations",
            keyPoints: [
              "Habitat refers to the natural environment where an organism lives and thrives.",
              "Biotic components are all living things (plants, animals, microbes). Abiotic components are non-living factors (air, water, sunlight, soil, temperature).",
              "Adaptations are special physical features or behaviors that help organisms survive in their specific surroundings.",
              "Desert plants (Cactus) have modified spines instead of broad leaves to minimize water loss by transpiration.",
              "Aquatic animals like fish have streamlined bodies, gills for respiration, and slippery scales for swimming."
            ],
            keyFormulasOrTips: "💡 Biotic (Living) + Abiotic (Non-living) = Balanced Ecosystem Habitat.",
            funFact: "Camels can drink up to 40 gallons of water in one session and store fat (not water!) in their humps for energy."
          },
          questions: [
            {
              id: "sci-liv-e1",
              difficulty: "easy",
              question: "Which breathing organ allows fish to absorb oxygen dissolved in water?",
              options: ["Lungs", "Skin pores", "Gills", "Spiracles"],
              correctIndex: 2,
              explanation: "Fish use gills lined with blood vessels to extract dissolved oxygen directly from water."
            },
            {
              id: "sci-liv-e2",
              difficulty: "easy",
              question: "Which of the following is an abiotic component of a habitat?",
              options: ["Bacteria", "Sunlight", "Earthworm", "Fern plant"],
              correctIndex: 1,
              explanation: "Abiotic factors are non-living elements such as sunlight, air, rocks, water, and temperature."
            },
            {
              id: "sci-liv-m1",
              difficulty: "medium",
              question: "Why do cactus plants have spines instead of wide green leaves?",
              options: [
                "To attract nocturnal birds",
                "To reduce water loss through transpiration",
                "To absorb raindrops directly",
                "To store sweet nectar"
              ],
              correctIndex: 1,
              explanation: "In dry deserts, reduced leaf surfaces (spines) minimize water vapor lost through transpiration."
            },
            {
              id: "sci-liv-c1",
              difficulty: "challenge",
              question: "How do animals in polar habitats conserve body warmth efficiently?",
              options: [
                "Thick layer of subcutaneous fat (blubber) and dense fur",
                "Large thin ears that radiate excess heat",
                "Sweating constantly",
                "Drinking cold sea water"
              ],
              correctIndex: 0,
              explanation: "Blubber acts as thermal insulation, while dense double coats trap air to maintain core body temperature."
            }
          ]
        }
      ]
    },
    {
      id: "maths",
      title: "Maths",
      icon: "📐",
      badge: "Logic",
      color: "#3b82f6",
      bgColor: "#eff6ff",
      description: "Master integers, fractions, geometry shapes, and problem solving.",
      topics: [
        {
          id: "integers",
          title: "Integers & Operations",
          icon: "➕",
          summary: {
            headline: "Chapter Overview: Integers",
            keyPoints: [
              "Integers form a collection of whole numbers and negative numbers: {..., -3, -2, -1, 0, 1, 2, 3, ...}.",
              "Zero is neither positive nor negative.",
              "On a number line, values increase as you move right and decrease as you move left.",
              "Rules of signs: Adding two negative integers gives a negative result (e.g. (-4) + (-3) = -7).",
              "Multiplying/dividing two like signs yields positive (+); unlike signs yield negative (-)."
            ],
            keyFormulasOrTips: "💡 (+) × (+) = (+),  (-) × (-) = (+),  (+) × (-) = (-),  (-) × (+) = (-).",
            funFact: "Negative numbers were first used in ancient India and China to represent financial debts!"
          },
          questions: [
            {
              id: "math-int-e1",
              difficulty: "easy",
              question: "What is the value of (-8) + 5?",
              options: ["-13", "-3", "3", "13"],
              correctIndex: 1,
              explanation: "When signs are different, subtract the numbers (8 - 5 = 3) and take the sign of the larger absolute value (-8), giving -3."
            },
            {
              id: "math-int-e2",
              difficulty: "easy",
              question: "Which integer is neither positive nor negative?",
              options: ["1", "-1", "0", "100"],
              correctIndex: 2,
              explanation: "Zero (0) sits at the neutral center of the number line, neither positive nor negative."
            },
            {
              id: "math-int-m1",
              difficulty: "medium",
              question: "Evaluate: (-6) × (-4)",
              options: ["-24", "24", "-10", "10"],
              correctIndex: 1,
              explanation: "Multiplying two negative numbers always results in a positive number: (-6) * (-4) = +24."
            },
            {
              id: "math-int-m2",
              difficulty: "medium",
              question: "Which of the following numbers is greatest?",
              options: ["-15", "-2", "0", "-1"],
              correctIndex: 2,
              explanation: "On a number line, 0 is to the right of all negative numbers, making it the largest among them."
            },
            {
              id: "math-int-c1",
              difficulty: "challenge",
              question: "Simplify: (-15) + (-10) - (-25)",
              options: ["-50", "0", "20", "-20"],
              correctIndex: 1,
              explanation: "(-15) + (-10) = -25. Subtracting a negative is adding: -25 - (-25) = -25 + 25 = 0."
            },
            {
              id: "math-int-c2",
              difficulty: "challenge",
              question: "A submarine is at 250 m below sea level (-250 m). It ascends 80 m. What is its new depth?",
              options: ["-330 m", "-170 m", "170 m", "-210 m"],
              correctIndex: 1,
              explanation: "-250 + 80 = -170 m (meaning 170 meters below sea level)."
            }
          ]
        },
        {
          id: "fractions-decimals",
          title: "Fractions & Decimals",
          icon: "🥧",
          summary: {
            headline: "Chapter Overview: Fractions & Decimals",
            keyPoints: [
              "A fraction represents part of a whole (Numerator / Denominator).",
              "Proper fraction: Numerator < Denominator (e.g. 3/4). Improper fraction: Numerator ≥ Denominator (e.g. 7/5).",
              "Mixed fraction: A whole number combined with a proper fraction (e.g. 1 2/5).",
              "To add or subtract fractions with unlike denominators, find the LCM of denominators first.",
              "To multiply fractions, multiply numerators together and denominators together."
            ],
            keyFormulasOrTips: "💡 (a/b) × (c/d) = (a × c) / (b × d). Reciprocal of a/b is b/a.",
            funFact: "The word 'fraction' comes from the Latin word 'fractus', meaning 'broken'!"
          },
          questions: [
            {
              id: "math-frac-e1",
              difficulty: "easy",
              question: "What is 1/4 + 2/4 simplified?",
              options: ["3/8", "3/4", "2/8", "1/2"],
              correctIndex: 1,
              explanation: "When denominators match, add numerators: (1 + 2) / 4 = 3/4."
            },
            {
              id: "math-frac-m1",
              difficulty: "medium",
              question: "What is the reciprocal of 7/9?",
              options: ["-7/9", "9/7", "2/9", "1/7"],
              correctIndex: 1,
              explanation: "The reciprocal of any fraction a/b is b/a. So reciprocal of 7/9 is 9/7."
            },
            {
              id: "math-frac-c1",
              difficulty: "challenge",
              question: "Evaluate: (3/5) ÷ (9/10)",
              options: ["2/3", "27/50", "3/2", "5/6"],
              correctIndex: 0,
              explanation: "To divide, multiply by reciprocal: (3/5) * (10/9) = 30/45 = 2/3."
            }
          ]
        }
      ]
    },
    {
      id: "english",
      title: "English",
      icon: "📚",
      badge: "Grammar & Vocab",
      color: "#8b5cf6",
      bgColor: "#f5f3ff",
      description: "Enhance grammar, vocabulary, parts of speech, and comprehension.",
      topics: [
        {
          id: "parts-of-speech",
          title: "Parts of Speech & Tenses",
          icon: "✍️",
          summary: {
            headline: "Chapter Overview: Parts of Speech",
            keyPoints: [
              "Noun: Name of a person, place, animal, or thing (e.g. Rahul, London, tiger, freedom).",
              "Pronoun: Replaces a noun to avoid repetition (e.g. he, she, they, it).",
              "Verb: An action or state of being (e.g. jump, read, is, become).",
              "Adjective: Describes or qualifies a noun (e.g. brave, sparkling, huge).",
              "Adverb: Modifies a verb, adjective, or another adverb, often ending in -ly (e.g. swiftly, gently, very).",
              "Prepositions indicate location or time relationships (e.g. under, above, between, at)."
            ],
            keyFormulasOrTips: "💡 Subject + Verb Agreement: Singular subject takes singular verb (The dog runs); Plural takes plural (The dogs run).",
            funFact: "The sentence 'The quick brown fox jumps over the lazy dog' is a pangram: it uses every letter in the English alphabet!"
          },
          questions: [
            {
              id: "eng-pos-e1",
              difficulty: "easy",
              question: "Identify the adjective: 'The courageous girl rescued the stranded puppy.'",
              options: ["girl", "courageous", "rescued", "puppy"],
              correctIndex: 1,
              explanation: "'Courageous' describes the noun 'girl', answering what kind of girl she was."
            },
            {
              id: "eng-pos-e2",
              difficulty: "easy",
              question: "Which of the following is a pronoun?",
              options: ["Elephant", "Gracefully", "They", "Golden"],
              correctIndex: 2,
              explanation: "'They' is a personal pronoun used to refer to a group of people or things."
            },
            {
              id: "eng-pos-m1",
              difficulty: "medium",
              question: "Choose the correct past continuous tense sentence:",
              options: [
                "She is playing the piano.",
                "She was playing the piano when I called.",
                "She played the piano yesterday.",
                "She will play the piano."
              ],
              correctIndex: 1,
              explanation: "Past continuous takes 'was/were + verb-ing' (was playing)."
            },
            {
              id: "eng-pos-m2",
              difficulty: "medium",
              question: "Fill in the blank: The books are lying ______ the wooden table.",
              options: ["between", "upon", "underneath", "on"],
              correctIndex: 3,
              explanation: "'On' is the standard preposition indicating contact with the top surface of the table."
            },
            {
              id: "eng-pos-c1",
              difficulty: "challenge",
              question: "Identify the adverb in: 'He spoke quite eloquently during the assembly.'",
              options: ["spoke", "eloquently", "assembly", "during"],
              correctIndex: 1,
              explanation: "'Eloquently' is an adverb of manner detailing how he spoke. ('Quite' is also an adverb of degree modifying eloquently)."
            }
          ]
        },
        {
          id: "vocabulary",
          title: "Vocabulary & Word Power",
          icon: "📖",
          summary: {
            headline: "Chapter Overview: Synonyms & Antonyms",
            keyPoints: [
              "Synonyms are words that have similar or nearly identical meanings (e.g., Happy = Joyful, Huge = Colossal).",
              "Antonyms are words with opposite meanings (e.g., Ancient = Modern, Victory = Defeat).",
              "Prefixes change meaning when attached to the beginning (un-, re-, pre-, dis-).",
              "Suffixes change word function when added to the end (-ful, -less, -ment, -tion)."
            ],
            keyFormulasOrTips: "💡 Reading daily for 15 minutes can teach you more than 1,000 new words in a year!",
            funFact: "'Set' has the highest number of definitions in the English dictionary (over 400 meanings)!"
          },
          questions: [
            {
              id: "eng-voc-e1",
              difficulty: "easy",
              question: "What is a synonym for 'Vast'?",
              options: ["Tiny", "Immense", "Narrow", "Crowded"],
              correctIndex: 1,
              explanation: "'Vast' and 'Immense' both describe something exceptionally huge or expansive."
            },
            {
              id: "eng-voc-m1",
              difficulty: "medium",
              question: "What is the antonym (opposite) of 'Benevolent' (kind and generous)?",
              options: ["Friendly", "Malevolent", "Gentle", "Helpful"],
              correctIndex: 1,
              explanation: "Malevolent means wishing evil or harm to others, which is the direct opposite of benevolent."
            },
            {
              id: "eng-voc-c1",
              difficulty: "challenge",
              question: "Which prefix can be added to 'appear' to mean 'to cease to be seen'?",
              options: ["Mis-", "Dis-", "Un-", "In-"],
              correctIndex: 1,
              explanation: "The prefix 'Dis-' added to 'appear' creates 'Disappear'."
            }
          ]
        }
      ]
    },
    {
      id: "social-science",
      title: "Social Science",
      icon: "🌍",
      badge: "Earth & History",
      color: "#f59e0b",
      bgColor: "#fffbeb",
      description: "Discover the Solar System, continents, civilizations, and our democracy.",
      topics: [
        {
          id: "earth-solar-system",
          title: "Earth in the Solar System",
          icon: "🪐",
          summary: {
            headline: "Chapter Overview: The Solar System",
            keyPoints: [
              "The Solar System consists of the Sun, 8 planets, satellites (moons), asteroids, and meteoroids.",
              "The Sun is the center of the solar system, providing heat and light.",
              "Earth is the 3rd planet from the Sun and 5th largest in size; it is unique because it supports life.",
              "Earth is known as the 'Blue Planet' because two-thirds of its surface is covered by water.",
              "The Moon is Earth's only natural satellite, orbiting it in approximately 27 days."
            ],
            keyFormulasOrTips: "💡 M-V-E-M-J-S-U-N: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
            funFact: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth!"
          },
          questions: [
            {
              id: "soc-earth-e1",
              difficulty: "easy",
              question: "Which planet is known as the 'Twin of Earth' due to similar size and shape?",
              options: ["Mars", "Venus", "Jupiter", "Mercury"],
              correctIndex: 1,
              explanation: "Venus is considered Earth's twin planet because of its very similar size and mass."
            },
            {
              id: "soc-earth-m1",
              difficulty: "medium",
              question: "Asteroids are found between the orbits of which two planets?",
              options: [
                "Mercury and Venus",
                "Earth and Mars",
                "Mars and Jupiter",
                "Jupiter and Saturn"
              ],
              correctIndex: 2,
              explanation: "The Asteroid Belt is located in the wide gap between Mars and Jupiter."
            },
            {
              id: "soc-earth-c1",
              difficulty: "challenge",
              question: "Why does only one side of the Moon face the Earth at all times?",
              options: [
                "The Moon doesn't rotate at all",
                "The Moon's rotation period equals its revolution period around Earth (~27 days)",
                "Earth's magnetic field locks it in place",
                "The Sun blinds our view of the dark side"
              ],
              correctIndex: 1,
              explanation: "Synchronous rotation: The Moon takes the exact same time to spin once on its axis as it takes to orbit Earth."
            }
          ]
        }
      ]
    }
  ]
};

// Export for module or browser window
if (typeof module !== "undefined" && module.exports) {
  module.exports = QUIZ_DATA;
}
