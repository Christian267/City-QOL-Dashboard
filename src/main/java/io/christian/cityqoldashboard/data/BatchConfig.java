package io.christian.cityqoldashboard.data;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import io.christian.cityqoldashboard.model.City;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    private final String[] FIELD_NAMES = new String[] { "id", "ua_name", "ua_country", "ua_continent", "housing",
            "cost_of_living", "startups", "venture_capital", "travel_connectivity", "commute", "business_freedom",
            "safety", "healthcare", "education", "environmental_quality", "economy", "taxation", "internet_access",
            "leisure_culture", "tolerance", "outdoors" };

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Bean
    public FlatFileItemReader<CityInput> reader() {
        return new FlatFileItemReaderBuilder<CityInput>().name("CityDataReader")
                .resource(new ClassPathResource("city-data.csv")).delimited().names(FIELD_NAMES)
                .fieldSetMapper(new BeanWrapperFieldSetMapper<CityInput>() {
                    {
                        setTargetType(CityInput.class);
                    }
                }).build();
    }

    @Bean
    public CityDataProcessor processor() {
        return new CityDataProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<City> writer(DataSource dataSource) {
        return new JdbcBatchItemWriterBuilder<City>()
                .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
                .sql("INSERT INTO city (id,ua_name,ua_country,ua_continent,housing,cost_of_living,startups,venture_capital,travel_connectivity,commute,business_freedom,safety,healthcare,education,environmental_quality,economy)"
                        + " VALUES (:id,:ua_name,:ua_country,:ua_continent,:housing,:cost_of_living,:startups,:venture_capital,:travel_connectivity,:commute,:business_freedom,:safety,:healthcare,:education,:environmental_quality,:economy)")
                .dataSource(dataSource).build();
    }

    @Bean
    public Job importUserJob(JobCompletionNotificationListener listener, Step step1) {
        return jobBuilderFactory
            .get("importUserJob")
            .incrementer(new RunIdIncrementer())
            .listener(listener)
            .flow(step1)
            .end()
            .build();
    }

    @Bean
    public Step step1(JdbcBatchItemWriter<City> writer) {
        return stepBuilderFactory
            .get("step1")
            .<CityInput, City>chunk(10)
            .reader(reader())
            .processor(processor())
            .writer(writer)
            .build();
    }
}