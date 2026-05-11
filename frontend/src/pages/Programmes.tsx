import { ArrowRight, Calendar, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import focusTechnology from "@/assets/focus-technology.jpg";

const projects = [
    {
        id: 1,
        title: "Watching The Vote (WTV)",
        summary: "Nigeria's largest citizen-led election observation initiative using advanced data analytics and technology to verify election results in real-time.",
        status: "Current",
        category: "Democracy",
        year: "2019 - Present",
    },
    {
        id: 2,
        title: "Ready To Run",
        summary: "A movement dedicated to supporting young people and women to run for office, providing training, mentorship, and resources for political leadership.",
        status: "Current",
        category: "Governance",
        year: "2018 - Present",
    },
    {
        id: 3,
        title: "Not Too Young To Run",
        summary: "The historic campaign that led to the reduction of age limits for running for political office in Nigeria, fostering youth inclusion in governance.",
        status: "Past",
        category: "Democracy",
        year: "2016 - 2018",
    },
    {
        id: 4,
        title: "Bounce Corruption",
        summary: "A project aimed at mobilizing citizens and young people to lead the fight against corruption through creative advocacy and community monitoring.",
        status: "Past",
        category: "Governance",
        year: "2017 - 2021",
    },
    {
        id: 5,
        title: "Community Ledger",
        summary: "Track and monitor the implementation of constituency projects at the local level to ensure accountability and service delivery.",
        status: "Current",
        category: "Governance",
        year: "2020 - Present",
    },
    {
        id: 6,
        title: "Voters' Rights Campaign",
        summary: "Nationwide sensitization on voter registration, education, and protection of the ballot to increase voter turnout and awareness.",
        status: "Current",
        category: "Democracy",
        year: "2022 - Present",
    },
];

const Programmes = () => {
    return (
        <PageLayout>
            <PageHero
                badge="Our Work"
                title="Impactful"
                titleHighlight="Programmes"
                description="Discover the initiatives and projects Yiaga Africa has spearheaded to strengthen democracy and governance across the continent."
                backgroundImage={focusTechnology}
            />

            <section className="py-20 lg:py-28 bg-background">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                            Projects & Initiatives
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                            Making a Difference Through
                            <span className="text-gradient"> Strategic Action</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            From historic campaigns to ongoing community projects, we are committed to building a transparent and accountable Africa.
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="group bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5",
                                        project.status === 'Current'
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                    )}>
                                        {project.status === 'Current' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                        {project.status}
                                    </div>
                                    <span className="text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                                    {project.summary}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                    <Calendar className="w-4 h-4 text-secondary" />
                                    {project.year}
                                </div>

                                <Link to="/contact">
                                    <Button variant="outline" className="w-full group/btn">
                                        Collaborate With Us
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                            Partner with Yiaga Africa
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            We are always looking for organizations and individuals who share our vision of a democratic and well-governed Africa. Reach out to discuss how we can work together.
                        </p>
                        <Link to="/contact">
                            <Button size="lg" className="h-14 px-10 text-lg font-semibold">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default Programmes;
